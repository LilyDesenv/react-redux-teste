import { screen } from '@testing-library/react'
// import { render, screen } from '@testing-library/react'
import Header from '../'
// import { Provider } from 'react-redux'
// import { store } from '../../../store'
// import { debug } from 'console'
import { renderizaComProvider } from '../../../utils/tests'

describe('testes para o Componente header', () => {
  test('Deve rederizar corretamente', () => {
    // const { debug } = render(
    //   <Provider store={store}>
    //     {' '}
    //     <Header />
    //   </Provider>
    // )
    // debug()
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carrinho', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['Windows'],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'Elden Ring'
            },
            {
              id: 2,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['Windows', 'PS5', 'Xbox Series'],
              preco: 190.9,
              precoAntigo: 259.9,
              titulo: 'Hogward Legacy'
            }
          ]
        }
      }
    })
    expect(screen.getByTestId('qnt-carrinho').innerHTML).toContain('2 itens')
  })
})
