/**
 * Wrapper for Web API fetch method
 * 
 * Really just here to allow ease of mocking
 */

 class FetchWrapper {
     /**
      * 
      * @param {(string|Request)} input - Requested resource; either URL or Request object
      * @param {any} init - Optional initialization params; @see fetch 
      * 
      * @returns {Promise<Response>} 
      */
     fetchData(input, init) {
         return fetch(input, init);
     }
 }

 export default FetchWrapper;
 