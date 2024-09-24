export interface Pergunta {
  id: number
  pergunta: string
}

export interface Resposta {
  id: number
  usuario: string
  pergunta: number
  pergunta_texto: string
  resposta: string
}


