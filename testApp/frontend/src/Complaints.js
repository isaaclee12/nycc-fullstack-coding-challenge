import React, {Component} from "react";

const API_URL = "http://localhost:8000/"
export default class Complaints extends Component {

    constructor(props) {
        super(props);

        //list that will contain complaints from api
        this.state={
            complaints:[]
        }
    }

    populateData() {
        try {
            fetch(API_URL+'api/complaints',  {mode: "no-cors"}).then(
                response => response.json().then(
                    data=>{
                        this.setState({complaints:data});
                    }
                )       
            )
        } catch(err) {
            console.log(err)
        }

    }

    componentDidMount() {
        this.populateData();
    }


    render() {

        // declare complaints var
        const {
            complaints
        }=this.state;

        return(
            <div>
                <h2>This is the complaints list</h2>

                <table>
                    <thead>
                        <tr>
                            {/* TODO: Order is currently mirroring SQLite3 DB, rearrange later to make sense. */}
                            <th>unique_key</th>
                            <th>account</th>
                            <th>opendate</th>
                            <th>complaint_type</th>
                            <th>descriptor</th>
                            <th>zip</th>
                            <th>borough</th>
                            <th>city</th>
                            <th>council_district</th>
                            {/* <!-- TODO figure out if this is the c.board for the complainer's dist. or the dist. complaint was made --> */}
                            <th>community_board</th>
                            <th>closedate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(c=>
                            <tr key={c.unique_key}>
                                <td key={c.unique_key}></td>
                                <td key={c.account}></td>
                                <td key={c.opendate}></td>
                                <td key={c.complaint_type}></td>
                                <td key={c.descriptor}></td>
                                <td key={c.zip}></td>
                                <td key={c.borough}></td>
                                <td key={c.city}></td>
                                <td key={c.council_district}></td>
                                <td key={c.community_board}></td>
                                <td key={c.closedate}></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}