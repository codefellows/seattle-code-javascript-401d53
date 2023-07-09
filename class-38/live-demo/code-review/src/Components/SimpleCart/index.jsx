import { useDispatch, useSelector } from 'react-redux';
import { When } from 'react-if';
import { remove } from '../../store/actions';

import './styles.scss';

function SimpleCart() {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <>
      <When condition={cart.length > 0}>
        <div className="simple-cart">
          <ul>

            {
              cart.map((product, index) => (
                <li key={`simpleCart-${index}`} className="item">
                  {product.name}
                  <span
                    onClick={() => dispatch(remove(product))}
                    className="remove"
                  >
                    X
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </When>
    </>
  )
}

export default SimpleCart;
