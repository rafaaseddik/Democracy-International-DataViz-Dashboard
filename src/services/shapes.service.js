import axios from 'axios';
import config from "../components/config";

export class ShapesService{

    async getShapes(municipalityName){
        let qString = `${config.apiUrl}/api/shape/${municipalityName}_sectors`;
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(response => {
                console.log('_sectors',response.data.data);
                this.setState({ shape_sector: JSON.parse(response.data.data) });
            })
            .catch(function (error) {
                console.log('error 1');
            });
    }
}
