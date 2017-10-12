import Vue from 'vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

const idProyect = 'cj8oqgyp300dm0119mdtxrifk'

// YOUR_GRAPH_QL_ENDPOINT_HERE
const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/' + idProyect, {
  reconnect: true
})

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/' + idProyect
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {
        Authorization: 'Bearer ' + Vue.ls.get('authToken')
      }
    }
    req.options.headers['x-graphcool-source'] = 'app:Yunga'
    next()
  }
}])

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true,
  dataIdFromObject: o => o.id
})

export default client
