import React from 'react';
import { Link } from "react-router-dom";
function Paging(props) {
    const links = props.links;
    const child = (e) => {
        props.han(e);
    }
    return (
        <div className="morePaging">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    {
                        links.map((item, key) => {
                            
                            if (key != 0 && key != links.length - 1) {
                                return (<li class="page-item"><Link class="page-link" to={'/'} onClick={(e) => child(key)}>{item.label}</Link></li>)
                            } 
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
export default Paging;