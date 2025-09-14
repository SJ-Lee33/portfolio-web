/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { dataset as d, projectId as p } from './src/sanity/env'
import { defineCliConfig } from 'sanity/cli'

const projectId = p
const dataset = d

export default defineCliConfig({ api: { projectId, dataset } })
