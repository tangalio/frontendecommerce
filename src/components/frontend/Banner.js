
import { Container } from 'react-bootstrap';
import b1 from './Images/banner_1.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import b2 from './Images/banner_2.png';
import b3 from './Images/banner_3.png';
function Banner() {
  return (
    <Container>
      <div className='banner-area'>
        <Row className='banner-content'>
          <Col className='banner-item'>
            <img
              className="d-block"
              src={b1}
              alt="Third slide"
            />
          </Col>
          <Col className='banner-item'>
            <img
              className="d-block"
              src={b2}
              alt="Third slide"
            />
          </Col>
          <Col className='banner-item'>
            <img
              className="d-block"
              src={b3}
              alt="Third slide"
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Banner;