import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

const IDPROYECT = 'cj8oqgyp300dm0119mdtxrifk'
const GC_AUTH_TOKEN = 'Bearer ' + localStorage.getItem('GC_AUTH_TOKEN')

// YOUR_GRAPH_QL_ENDPOINT_HERE
const wsClient = new SubscriptionClient('wss://subscriptions.us-west-2.graph.cool/v1/' + IDPROYECT, {
  reconnect: true,
  connectionParams: {
    authToken: GC_AUTH_TOKEN
  }
})

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/' + IDPROYECT
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {
        Authorization: GC_AUTH_TOKEN
      }
    }
    req.options.headers['x-graphcool-source'] = 'app:SocialGraphQl'
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
