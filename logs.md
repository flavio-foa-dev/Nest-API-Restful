Logs funcionam como um diário das atividades e comportamentos da aplicação em produção. Nesse sentido, os logs são indispensáveis para entendermos o comportamento da aplicação e pensarmos em estratégias para uma melhora contínua de forma eficiente.

 - algumas formas de registros usados no mercado de trabalho?

- Logs de Aplicação: registram informações específicas sobre o comportamento e a execução de uma aplicação. Podem incluir informações sobre ações do usuário, eventos importantes, erros e exceções lançadas durante a execução.

- Logs de Erro (Error Logs): Registram detalhes sobre erros e falhas que ocorrem no sistema ou aplicação. Esses logs são essenciais para identificar e diagnosticar problemas, permitindo que os desenvolvedores realizem a depuração e a correção adequada.

- Logs de Depuração (Debug Logs): Utilizados no ambiente de desenvolvimento e na fase de depuração do código. A função desses logs é fornecer informações detalhadas sobre o fluxo de execução do programa, variáveis e estados internos, facilitando a identificação de problemas e comportamentos inesperados.

- Logs de Acesso (Access Logs): Registram informações sobre os acessos ao sistema ou aplicação, incluindo detalhes sobre as requisições feitas pelos usuários, como endereço IP, data e hora de acesso, método HTTP, URL, entre outros.

- Logs de Segurança (Security Logs): Monitoram e registram atividades de segurança, como tentativas de acesso não autorizado, falhas de autenticação, eventos de login e outras atividades suspeitas.

- Logs de Desempenho (Performance Logs): Registram informações relacionadas ao desempenho do sistema ou aplicação, como tempos de resposta, uso de recursos do servidor, latência de rede e outros indicadores de desempenho.

- Logs de Auditoria (Audit Logs): Esses logs registram ações e eventos importantes para fins de auditoria e conformidade com regulamentações e políticas internas. Podem incluir ações realizadas por usuários privilegiados, alterações de configuração e outras atividades críticas.

- Logs de Transações (Transaction Logs): Utilizados principalmente em bancos de dados e sistemas de processamento de transações, esses logs registram detalhes sobre as transações realizadas, garantindo a integridade e a consistência dos dados.

- Logs de Sistema (System Logs): Esses logs são referentes ao sistema operacional e registram informações sobre eventos importantes do sistema, como inicialização, desligamento, falhas do kernel e outras ocorrências relevantes.

- Logs de Infraestrutura (Infrastructure Logs): Registram informações sobre a infraestrutura de TI, como servidores, redes, dispositivos e recursos de armazenamento. Podem incluir eventos de falha, alertas de monitoramento e informações de configuração.

Para realização dos diferentes tipos de Log citados, utilizamos técnicas aplicadas às ferramentas de desenvolvimento, como o Nest.js, que oferece nativamente os Loggers a partir da interface LoggerService, confira no código a seguir:

```
import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService
  log(message: any, ...optionalParams: any[]) {}

  error(message: any, ...optionalParams: any[]) {}

  warn(message: any, ...optionalParams: any[]) {}

  debug?(message: any, ...optionalParams: any[]) {}

  verbose?(message: any, ...optionalParams: any[]) {}
  }

```
Podemos notar que temos diferentes opções de métodos, vamos entendê-las?

- Log: propósito geral para registro de qualquer informação importante.
- Warn: pontos de atenção, são alertas categorizados como não fatais ou destrutivos no sistema.
- Debug: registro de informações úteis que podem auxiliar na depuração da lógica em caso de um erro ou alerta.
- Error: pontos não resolvidos que podem ser fatais ou destrutivos para a aplicação.
- Verbose: informações mais robustas sobre comportamento da aplicação. Normalmente carrega muitos detalhes e é utilizado em ambiente de desenvolvimento.

A aplicação correta dos métodos, ou seja, a que está de acordo com o registro que será solicitado naquele contexto favorece a legibilidade do seu sistema.

Assim, a prática de Logs oferece diversos benefícios a um sistema ou aplicação, dentre eles:

- Depuração: ao registrar informações relevantes sobre eventos e ações, logs facilitam a identificação de falhas e simplificam o processo de correção.
- Diagnóstico e Monitoramento: os registros permitem um acompanhamento contínuo do desempenho do sistema. Ao analisar os logs, é possível identificar padrões, tendências e anomalias, tornando mais ágil a identificação de áreas que necessitam de otimização ou ação corretiva.
- Rastreamento: logs oferecem um histórico detalhado das operações e transações realizadas. Isso é especialmente útil para rastrear atividades específicas, como identificar a origem de problemas de segurança ou determinar a sequência de ações que levaram a um determinado resultado.
- Manutenção e suporte :os logs auxiliam na manutenção do sistema ao permitir uma análise mais precisa do seu estado. Isso também simplifica o suporte técnico, já que os profissionais podem contar com informações detalhadas para solucionar problemas.
- Melhoria Contínua: através da análise dos registros, é possível identificar oportunidades de aprimoramento e otimização do sistema.

