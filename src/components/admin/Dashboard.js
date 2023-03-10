import React from "react";
import Widget from "../frontend/widget/Widget";
import Featured from "../frontend/featured/Featured";
import Chart from "../frontend/chart/Chart";
import Table from "../frontend/table/Table";
function Dashboard() {
    return (
        <div>
            <div className="widgets">
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </div>
            <div className="charts">
                <Featured />
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <Table />
            </div>
        </div>
    );
}

export default Dashboard;