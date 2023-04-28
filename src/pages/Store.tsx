import StoreItem from '../components/StoreItem'
import {Row,Col} from 'react-bootstrap'
import {useProductsContext } from '../context/ProductsContext'
import StoreItemMemo from '../components/StoreItem'

type Props = {}

const Store = (props: Props) => {
  const{pState} = useProductsContext()

  return (
    <>
      <Row md={2} sm={1} lg={4} className='g-3'>
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