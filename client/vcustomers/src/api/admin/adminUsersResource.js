/**
 * Created by taylor on 6/13/17.
 */
import axios from 'axios';

export default axios.create({
  baseURL: `${document.location.origin}/api/v1/admin`,
  timeout: 4000
});

