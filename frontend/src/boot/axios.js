import Vue from 'vue'
import axios from 'axios'
import config from '../../config'

const axiosConfig = {
  baseURL: config.API_URL,
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig);