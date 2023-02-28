import axios from "axios";
const newInstance = axios.create({
  baseURL: 'https://taskmanager.ron.digital/api'
});

export default newInstance;