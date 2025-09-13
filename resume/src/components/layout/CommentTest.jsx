import { useMemo, useState } from "react";
import { List, Avatar, Button, Space, Input, Typography, Popconfirm, message } from "antd";
import RepliesWithEditor from "./RepliesWithEditor";

const { Text } = Typography;
const { TextArea } = Input;

/** 예시: Oracle에서 이미 댓글 pk → 해당 댓글의 답글 pk 순으로 정렬되어 내려온 평면 rows */
const initialRows = [
  { pk: 1,  upper_key: null, author: "Alice",  avatar: "https://i.pravatar.cc/40?img=1", content: "1번 댓글" },
  { pk: 2,  upper_key: null, author: "Bob",    avatar: "https://i.pravatar.cc/40?img=2", content: "2번 댓글" },
  { pk: 3,  upper_key: null, author: "Carol",  avatar: "https://i.pravatar.cc/40?img=3", content: "3번 댓글" },
  { pk: 31, upper_key: 3,    author: "Dave",   avatar: "https://i.pravatar.cc/40?img=4", content: "3번의 1번째 답글" },
  { pk: 32, upper_key: 3,    author: "Erin",   avatar: "https://i.pravatar.cc/40?img=5", content: "3번의 2번째 답글" },
  { pk: 4,  upper_key: null, author: "Frank",  avatar: "https://i.pravatar.cc/40?img=6", content: "4번 댓글" },
];

export default function CommentBoard() {
  const [rows, setRows] = useState(initialRows);

  // (옵션) 새 댓글 입력
  const [newComment, setNewComment] = useState("");

  /** 부모만 추출(pk ASC) */
  const parents = useMemo(
    () => rows.filter(r => r.upper_key == null).sort((a, b) => a.pk - b.pk),
    [rows]
  );

  /** parentPk의 답글만 추출(pk ASC) */
  const getReplies = (parentPk) =>
    rows.filter(r => r.upper_key === parentPk).sort((a, b) => a.pk - b.pk);

  /** 댓글 등록 (옵션) */
  const addComment = () => {
    const text = newComment.trim();
    if (!text) return message.warning("댓글을 입력하세요.");
    const tmpPk = Date.now();
    setRows(prev => [
      ...prev,
      { pk: tmpPk, upper_key: null, author: "나", avatar: "https://i.pravatar.cc/40?img=11", content: text }
    ]);
    setNewComment("");
    message.success("댓글 등록");
  };

  /** 댓글 삭제(부모 + 그 답글 모두 제거) */
  const deleteComment = (pk) => {
    setRows(prev => prev.filter(r => r.pk !== pk && r.upper_key !== pk));
  };

  /** 답글 추가(자식 컴포넌트에서 호출): upper_key=부모 pk로 평면 rows에 불변 추가 */
  const addReply = (parentPk, content) => {
    const text = (content ?? "").trim();
    if (!text) return;
    const tmpPk = Date.now(); // 서버 저장 전 임시 pk
    setRows(prev => [
      ...prev,
      {
        pk: tmpPk,
        upper_key: parentPk,            // ← 핵심
        author: "나",
        avatar: "https://i.pravatar.cc/40?img=12",
        content: text,
      },
    ]);
  };

  /** 답글 삭제(자식 컴포넌트에서 호출) */
  const deleteReply = (replyPk) => {
    setRows(prev => prev.filter(r => r.pk !== replyPk));
  };

  return (
    <div>
      {/* (옵션) 상단: 새 댓글 입력 */}
      <div style={{ marginBottom: 16 }}>
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          autoSize={{ minRows: 2 }}
        />
        <Space style={{ marginTop: 8 }}>
          <Button type="primary" size="small" onClick={addComment}>댓글 등록</Button>
          {newComment && <Button size="small" onClick={() => setNewComment("")}>취소</Button>}
        </Space>
      </div>

      {/* 부모 댓글 리스트 */}
      <List
        itemLayout="horizontal"
        dataSource={parents}
        rowKey={(c) => c.pk}
        renderItem={(parent) => (
          <li key={parent.pk} style={{ listStyle: "none" }}>
            {/* 댓글 한 줄 */}
            <List.Item
              actions={[
                // 답글 버튼은 RepliesWithEditor 안으로 옮겨도 되지만,
                // 댓글 액션에 두고 싶다면 아래 버튼은 제거하고 자식 쪽에서 별도 버튼을 유지하세요.
                <Popconfirm
                  key="del"
                  title="댓글을 삭제할까요? (답글 포함)"
                  okText="삭제"
                  cancelText="취소"
                  onConfirm={() => deleteComment(parent.pk)}
                >
                  <Button type="link" danger>삭제</Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={parent.avatar} alt={parent.author} />}
                title={<Text strong>{parent.author}</Text>}
                description={parent.content}
              />
            </List.Item>

            {/* ✅ 답글 + 입력창 (한 파일) — 항상 답글 목록 아래에 입력창이 나오도록 */}
            <RepliesWithEditor
              parentPk={parent.pk}
              replies={getReplies(parent.pk)}
              onAddReply={(text) => addReply(parent.pk, text)}
              onDeleteReply={deleteReply}
            />
          </li>
        )}
      />
    </div>
  );
}