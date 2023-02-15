import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import s1 from './Images/slider_1.png';
import s2 from './Images/slider_2.png';
import s3 from './Images/slider_3.png';
function Slider() {
  return (
    <Container fluid>
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={s1}
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={s2}
            alt="Second slide"
          />

          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={s3}
            alt="Third slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Slider;