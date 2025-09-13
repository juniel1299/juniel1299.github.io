import { Col, Flex, Row, Space } from "antd";
import Introduce from './Introduce';
import { CalendarOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";


function Profile() {
  return (
    <div className={`h-full flex flex-col gap-3`}>
      <Row className="h-1/3">
        <Col>Introduce</Col>
      </Row>
      <Row className="h-1/3 flex text-2xl items-baseline!">
        <Col className="flex w-[300px] ml-5!">
          (No Image)
        </Col>
        <Row className="flex items-center!" align="middle">
          <Col className="text-2xl ml-2!">
            장원준
          </Col>
          <Col className="text-lg">
            (Juniel)
          </Col>
        </Row>
      </Row>
      <Row className="flex">
        <Row className="flex! flex-col!">
          {/* 안 쓰는 영역 */}
          <Col className="w-[300px] ml-5!">
          </Col>
          {/* 쓰는 영역 */}
          <Col className="">
            <CalendarOutlined />
          </Col>
          <Col className="ml-2!">
            1999.12.15
          </Col>
        </Row>
      </Row>
      <Row className="flex">
        <Row className="flex! flex-col!">
          {/* 안 쓰는 영역 */}
          <Col className="w-[300px] ml-5!">
          </Col>
          {/* 쓰는 영역 */}
          <Col className="">
            <MailOutlined />
          </Col>
          <Col className="ml-2!">
            youngs5440@gmail.com
          </Col>
        </Row>
      </Row>
      <Row className="flex">
        <Row className="flex! flex-col!">
          {/* 안 쓰는 영역 */}
          <Col className="w-[300px] ml-5!">
          </Col>
          {/* 쓰는 영역 */}
          <Col className="">
            <GithubOutlined />
          </Col>
          <Col className="ml-2!">
          <a href="https://github.com/juniel1299">
          https://github.com/juniel1299
          </a>
          </Col>
        </Row>
      </Row>
      <Row className="h-1/3 ">
      </Row>
      <Introduce></Introduce>
    </div>
  );
}
export default Profile