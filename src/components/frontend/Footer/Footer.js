import { Col, Row } from "react-bootstrap";
import { AiOutlineFacebook, AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
function Footer() {

    return (
        <div className="footer">
            <Row className="another-thing">
                <Col className="footer-content">
                    <h3>Giới thiệu</h3>
                    Aishop là một trang web bán hàng.
                </Col>
                <Col className="help-content">
                    <h3>Hỗ trợ khách hàng</h3>
                    <ul>
                        <li>
                            <Link to="#">Chính sách giao hàng</Link>
                        </li>
                        <li>
                            <Link to="#">Phương thức thanh toán</Link>
                        </li>
                        <li>
                            <Link to="#">Điều khoản mua bán</Link>
                        </li>
                    </ul>

                </Col>
                <Col className="contract">
                    <h3>Liên hệ</h3>
                    <p> Email: axxxxxxxx@gmail.com</p>
                    <p> SDT: 039xxxxxxxx.</p>
                    <AiOutlineFacebook className="ico-size space-ico" />
                    <AiOutlineGithub className="ico-size space-ico" />
                    <FcGoogle className="ico-size space-ico" />
                </Col>

            </Row>
            <div className="create-by">
                <p>Copyright © 2022 Ai-chan All Rights Reserved.</p>
            </div>
        </div>
    );

}

export default Footer;