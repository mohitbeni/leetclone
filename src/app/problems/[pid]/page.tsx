import Topbar from '@/components/Topbar/Topbar'
import Workspace from '@/components/Workspace/Workspace'
import useHasMounted from '@/hooks/useHasMounted'
import { problems } from '@/utils/problems/page'

import { Problem } from '@/utils/types/problem'
import { notFound } from 'next/navigation'
import React from 'react'

type ProblemPageProps = {
  problem: Problem
}

// fetch the local data
//  SSG
// getStaticPaths => it create the dynamic routes
export default async function ProblemPage({
  params,
}: {
  params: { pid: string }
}) {
  const { pid } = params
  const problem = problems[pid]
  // console.log('Problem:', problem)

  if (!problem) {
    return notFound()
  }
  problem.handlerFunction = problem.handlerFunction.toString()

  return (
    <div>
      <Topbar problemPage problem={problem} />
      {/* <Workspace problem={problem} /> */}
    </div>
  )
}

// const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
//   console.log(problem)
// const paths = Object.keys(problems).map((key) => ({
//   params: {
//     pid: key,
//   },
// }))
// console.log(paths)

// }
// export default ProblemPage
