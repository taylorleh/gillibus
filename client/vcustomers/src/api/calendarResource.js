/**
 * Created by taylor on 6/6/17.
 */
import axios from 'axios';

export default axios.create({
  baseURL: `${document.location.origin}/api/v1/calendar`,
  timeout: 2000
})
