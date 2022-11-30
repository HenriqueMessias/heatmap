export interface Notifies {
    "took": number,
    "timed_out": boolean,
    "_shards"?: {
        "total": number,
        "successful": number,
        "skipped": number,
        "failed": number
    },
    "hits"?: {
        "total": {
            "value": number,
            "relation": string
        },
        "max_score": number,
        "hits": NotifiesData[]
      }
}

export interface NotifiesData{
  "_index": string,
  "_type": string,
  "_id": string,
  "_score": number,
  "_source": {
      "dataInicioTratamento"?: string|any,
      "outroTriagemPopulacaoEspecifica": string|any,
      "codigoRecebeuAntiviral": string|any,
      "municipioIBGE": string|any,
      "estadoTeste": string,
      "sintomas": string,
      "@version": string,
      "profissionalSaude": string,
      "codigoContemComunidadeTradicional": string,
      "dataEncerramento": string,
      "codigoEstrategiaCovid": string,
      "codigoDosesVacina"?: string[],
      "dataNotificacao": string,
      "dataReforcoDose": string,
      "codigoRecebeuVacina": string,
      "municipio": string,
      "condicoes"?: string|any,
      "resultadoTesteSorologicoIgG"?: string|any,
      "registroAtual"?: boolean,
      "idade": number,
      "estadoNotificacaoIBGE": string,
      "dataTesteSorologico"?: string|any,
      "dataInicioSintomas": string,
      "cbo"?: string|any,
      "tipoTesteSorologico"?: string|any,
      "laboratorioSegundaReforcoDose"?: string|any,
      "classificacaoFinal"?: string|any,
      "id": string,
      "outrosSintomas"?: string,
      "estadoNotificacao": string,
      "sexo": string,
      "dataPrimeiraDose"?: string,
      "loteSegundaReforcoDose"?: string,
      "racaCor": string,
      "codigoTriagemPopulacaoEspecifica"?: string|any,
      "resultadoTesteSorologicoIgM"?: string|any,
      "resultadoTeste"?: string|any,
      "resultadoTesteSorologicoIgA"?: string|any,
      "idCollection": string,
      "dataSegundaDose"?: string|any,
      "municipioNotificacaoIBGE": string,
      "profissionalSeguranca": string,
      "codigoBuscaAtivaAssintomatico"?: string|any,
      "outroLocalRealizacaoTestagem"?: string|any,
      "estado": string,
      "estadoIBGE": string,
      "outroAntiviral"?: string|any,
      "evolucaoCaso"?: string|any,
      "dataSegundaReforcoDose"?: string|any,
      "estrangeiro"?: string|any,
      "codigoQualAntiviral"?: string|any,
      "qualAntiviral"?: string|any,
      "codigoLocalRealizacaoTestagem": string,
      "tipoTeste"?: string|any,
      "@timestamp": string,
      "outrasCondicoes"?: string|any,
      "resultadoTesteSorologicoTotais"?: string|any,
      "recebeuAntiviral"?: string|any,
      "outroBuscaAtivaAssintomatico"?: string|any,
      "testes"?: NotifiesDataTest[],
      "dataTeste"?: string|any,
      "municipioNotificacao": string
  }
}

export interface NotifiesDataTest {
    "codigoEstadoTeste": string,
    "estadoTeste": string,
    "codigoTipoTeste": string,
    "codigoResultadoTeste": string,
    "resultadoTeste": string,
    "fabricanteTeste": string,
    "loteTeste"?: string|any,
    "dataColetaTeste": {
        "iso": string,
        "__type": string
    },
    "codigoFabricanteTeste": string,
    "tipoTeste": string
}
