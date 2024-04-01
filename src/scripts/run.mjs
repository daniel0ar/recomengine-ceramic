import ora from 'ora'
import { writeComposite } from './composites.mjs';
import { spawn } from "child_process"


const spinner = ora();

const bootstrap = async () => {
  try {
    spinner.info("[Composites] bootstrapping composites");
    await writeComposite(spinner)
    spinner.succeed("[Composites] composites bootstrapped");
  } catch (err) {
    spinner.fail(err.message)
    throw err
  }
}

const graphiql = async () => {
  spinner.info("[GraphiQL] starting graphiql");
  const graphiql = spawn('node', ['./scripts/graphiql.mjs'])
  spinner.succeed("[GraphiQL] graphiql started");
  graphiql.stdout.on('data', (buffer) => {
    console.log('[GraphiqQL]',buffer.toString())
  })
}

const start = async () => {
  try {
    spinner.start('[App] Starting Dev environment\n')
    await bootstrap()
    //await graphiql()
  } catch (err) {
    spinner.fail(err)
    process.exit()
  }
}

start()