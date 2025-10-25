class ApiUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginresponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        })

        const loginData = await loginresponse.json();
        const token = loginData.token;
        console.log(token); 
        return token;
    }

    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();

        // Order API Call
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayLoad, headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            })

        const orderRes = await orderResponse.json();
        console.log(orderRes);
        const orderId = orderRes.orders[0];
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}

module.exports = { ApiUtils };
