import StoreItem from '../components/StoreItem'
import {Row,Col} from 'react-bootstrap'
import {useProductsContext } from '../context/ProductsContext'
import StoreItemMemo from '../components/StoreItem'

type Props = {}

const Store = (props: Props) => {
  const{pState} = useProductsContext()

  return (
    <>
      <Row xl={4} md={2} sm={1} lg={3} className='g-3'>
        {pState.products.map(item => (
          <Col key={item.id}>
            <StoreItemMemo {...item}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Store