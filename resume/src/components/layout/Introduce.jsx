import { Col, Row } from "antd";

function Introduce() {
  return (
    <div className={`h-full flex flex-col gap-3`}>
      <Row className="h-1/3">
        <Col>Introduce</Col>
      </Row>
      <Row className="h-1/3 flex gap-6 text-2xl">
        <Col className="text-2xl">
          Juniel
        </Col>
        <Col className="text-2xl">
          Programmer
        </Col>
      </Row>
      <Row className="h-1/3 ">
      <Col className="text-2xl">
        1년차, 긍정과 부정 모든 감정을 통해 배우는 개발자 장원준입니다.
      </Col>
      </Row>
    </div>
  );
}
export default Introduce