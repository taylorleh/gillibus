/**
 * Created by taylor on 6/21/17.
 */

import axios from 'axios';

export default axios.create({
  baseURL: `${document.location.origin}/api/v1/booking`,
  timeout: 4000
});
