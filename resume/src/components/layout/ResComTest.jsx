import { useEffect, useRef, useState } from "react";
import { List, Avatar, Button, Popconfirm, Typography, Input, Space } from "antd";
const { Text } = Typography;
const { TextArea } = Input;

/**
 * props:
 * - parentPk: 부모 댓글 pk
 * - replies: [{ pk, upper_key, author, avatar, content }]  // 1레벨만
 * - onAddReply(content: string): void                       // 저장 콜백(부모가 rows 업데이트)
 * - onDeleteReply(replyPk: number): void
 */
export default function RepliesWithEditor({
  parentPk,
  replies = [],
  onAddReply,
  onDeleteReply,
}) {
  // 이 컴포넌트 내부에서만 답글 열림/입력 상태를 관리
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  const open = () => { setIsOpen(true); setDraft(""); };
  const cancel = () => { setIsOpen(false); setDraft(""); };

  const save = () => {
    const text = draft.trim();
    if (!text) return;
    onAddReply(text);  // 부모가 rows에 upper_key=parentPk로 추가
    cancel();
  };

  // 입력창을 열거나 답글 수가 변하면 맨 아래로 스크롤
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, replies.length]);

  return (
    <div style={{ paddingLeft: 48, marginTop: 4 }}>
      {/* 1) 답글 목록 */}
      {replies.length > 0 && (
        <List
          size="small"
          dataSource={replies}
          rowKey={(r) => r.pk}
          renderItem={(r) => (
            <List.Item
              style={{ paddingLeft: 0 }}
              actions={[
                <Popconfirm
                  key="del"
                  title="답글을 삭제할까요?"
                  okText="삭제"
                  cancelText="취소"
                  onConfirm={() => onDeleteReply(r.pk)}
                >
                  <Button type="link" size="small" danger>
                    삭제
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={r.avatar} alt={r.author} />}
                title={<Text>{r.author}</Text>}
                description={r.content}
              />
            </List.Item>
          )}
        />
      )}

      {/* 2) 입력창: 항상 ‘답글 목록의 맨 아래’에 표시 */}
      {isOpen ? (
        <div style={{ marginTop: 8 }}>
          <TextArea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoSize={{ minRows: 2 }}
            placeholder="답글을 입력하세요"
            autoFocus
          />
          <Space style={{ marginTop: 6 }}>
            <Button type="primary" size="small" onClick={save}>등록</Button>
            <Button size="small" onClick={cancel}>취소</Button>
          </Space>
        </div>
      ) : (
        // 3) 닫혀 있을 땐 ‘답글’ 버튼 하나만
        <Button type="link" size="small" onClick={open} style={{ marginTop: 4 }}>
          답글
        </Button>
      )}

      {/* 스크롤 앵커 */}
      <div ref={bottomRef} />
    </div>
  );
}