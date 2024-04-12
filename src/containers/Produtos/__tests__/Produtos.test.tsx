import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5'],
    preco: 150,
    precoAntigo: 200,
    titulo: 'Gothan Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series'],
    preco: 250,
    precoAntigo: 120,
    titulo: 'Sonic Frontier'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)
describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregando', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  // test('Deve renderizar corretamente com a listagem de jogos', async () => {
  //   const { debug } = renderizaComProvider(<Produtos />)
  //   await waitFor(() => {
  //     debug()
  //     expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
  //   })
  // })
})
