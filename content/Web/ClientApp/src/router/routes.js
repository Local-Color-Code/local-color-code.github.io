import FetchData from '../components/fetch-data.vue';

export const routes = [
  { name: 'home', path: '/', component: FetchData, display: 'Home', icon: 'home' },
  { name: 'fetch-data', path: '/fetch-data', component: FetchData, display: 'Data', icon: 'list' }
];
