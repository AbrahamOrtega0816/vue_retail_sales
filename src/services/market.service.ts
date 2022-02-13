const MarketService = (api : any) => ({
    getProducts: async () =>{
      const response = await api.get(`https://run.mocky.io/v3/729fdd53-f365-49b4-bd55-f7e10bcc9a4b`).then(( res : any) => {
        return res;
      },
      (error : Error) => {
        return error;
      }
    );
    return response;
    },
});
  
export default MarketService;
  