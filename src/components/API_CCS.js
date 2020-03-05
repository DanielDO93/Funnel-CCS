import AuthService from './AuthService';


class API_CCS {


constructor() {
    
    this.Auth = new AuthService();
    this.fetch = this.fetch.bind(this) // React binding stuff
}
 
 

async fetch(url, options) {


		// performs api calls sending the required authentication headers
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		// Setting Authorization header
		// Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
		if (await this.Auth.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + await this.Auth.getToken()
		} else {
            window.location.href ="/login"
        }

		return fetch(url, {
			headers,
			...options
		})
		.then(this._checkStatus)
		.then(response => response.json())

}

   

  getCampaignAvatar(id) {


       return this.fetch('https://api.ccscontactcenter.com/v1/Campaigns/Avatar?id=' + id, {    
            method: 'GET',
        }).then(res => {
            
            return Promise.resolve(res);
        })
   
    }          

    newLead(data) {

        return this.fetch('https://api.ccscontactcenter.com/v1/Comercial/Lead_Contactos', {    
            method: 'POST',
            body: JSON.stringify(
                data
            )
        }).then(res => {
            return Promise.resolve(res);
        })
    }

    updateLead(data) {

        return this.fetch('https://api.ccscontactcenter.com/v1/Comercial/Lead_Contactos', {    
            method: 'PUT',
            body: JSON.stringify(
                data
            )
        }).then(res => {
            return Promise.resolve(res);
        })
    }

    getLeads(){

        return this.fetch('https://api.ccscontactcenter.com/v1/Comercial/Lead_Contactos', {    
            method: 'GET',
        }).then(res => {
            
            return Promise.resolve(res);
        })
    }

    getLead(id){

        return this.fetch('https://api.ccscontactcenter.com/v1/Comercial/Lead_Contactos/' + id, {    
            method: 'GET',
        }).then(res => {
            
            return Promise.resolve(res);
        })
    }

    getLayoutFiiltrado(Intervalo, Status){

        return this.fetch('https://api.ccscontactcenter.com/v1/Comercial/Layout_Status?tipo=' + Intervalo + '&status=' + Status, {    
            method: 'GET',
        }).then(res => {
            
            return Promise.resolve(res);
        })
    }

    getStatus(Intervalo){

    
        return this.fetch('https://api.ccscontactcenter.com/v1/Comercial/Status_General?tipo=' + Intervalo, {    
            method: 'GET',
        }).then(res => {
            
            return Promise.resolve(res);
            
        })
    }

}
export default API_CCS