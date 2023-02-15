
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsPlusCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';



function Card_product(props) {
  const format = (n) => {
    n = new Number(n);
    return n.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  };
  return (
    <Card className='card-product'>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title><Link to={`/product_detail/${props.id}`} state={{ from: [props.id, props.img, props.name, props.price, props.description, props.category_id] }}>{props.name}</Link></Card.Title>
        <Card.Text>
          {/* {props.price} */}
          {
            format(props.price)
          }
        </Card.Text>
      </Card.Body>
    </Card>

  );
}

export default Card_product;