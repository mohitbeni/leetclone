'use client'
import { auth } from '@/firebase/firebase'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Logout from '../Buttons/Logout'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BsList } from 'react-icons/bs'
import Timer from '../Timer/Timer'
import Workspace from '../Workspace/Workspace'
import { Problem } from '@/utils/types/problem'
import { useRouter, useSearchParams } from 'next/navigation'
import { problems } from '@/utils/problems/page'

type TopbarProps = {
  problemPage?: boolean
  problem?: Problem | null | undefined
}

const Topbar: React.FC<TopbarProps> = ({ problemPage, problem }) => {
  const [user] = useAuthState(auth)
  const setAuthModalState = useSetRecoilState(authModalState)
  const router = useRouter()
  const searchParams = useSearchParams()
  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[problem!.id as string] as Problem
    const direction = isForward ? 1 : -1
    const nextProblemOrder = order + direction
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    )
    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      )
      router.push(`/problems/${firstProblemKey}`)
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 5
      )
      router.push(`/problems/${lastProblemKey}`)
    } else {
      router.push(`/problems/${nextProblemKey}`)
    }
  }

  return (
    <>
      <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
        <div
          className={`flex w-full items-center justify-between ${
            !problemPage ? 'max-w-[1200px] mx-auto' : ''
          }`}
        >
          <Link href="/" className="h-[22px] flex-1">
            {/* <img src="/logo-full.png" alt="Logo" className="h-full" /> */}
            <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
          </Link>

          {problemPage && (
            <div className="flex items-center gap-4 flex-1 justify-center">
              <div
                className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
                onClick={() => handleProblemChange(false)}
              >
                <FaChevronLeft />
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 font-medium max-w-[]170px text-dark-gray-8 cursor-pointer"
              >
                <div>
                  <BsList />
                </div>
                <p>ProblemList</p>
              </Link>
              <div
                className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
                onClick={() => handleProblemChange(true)}
              >
                <FaChevronRight />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div>
              <a
                href="https://www.buymeacoffee.com/burakorkmezz"
                target="_blank"
                rel="noreferrer"
                className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
              >
                Premium
              </a>
            </div>
            {problemPage && user && <Timer />}
            {!user && (
              <Link href="/auth">
                <button
                  className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded "
                  onClick={() => {
                    setAuthModalState((prev) => ({
                      ...prev,
                      isOpen: true,
                      type: 'login',
                    }))
                  }}
                >
                  Sign In
                </button>
              </Link>
            )}
            {user && (
              <div className="cursor-pointer group relative">
                <img
                  src="/avatar.png"
                  alt="user profile img"
                  className="h-8 w-8 rounded-full"
                />
                <div
                  className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg
								z-40 group-hover:scale-100 scale-0
								transition-all duration-300 ease-in-out"
                >
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            )}
            {user && <Logout />}
          </div>
        </div>
      </nav>
      {problemPage && <Workspace problem={problem!} />}
    </>
  )
}
export default Topbar
