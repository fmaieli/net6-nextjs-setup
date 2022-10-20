import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { ProfileDropdown } from './ProfileDropdown'
import { useContext } from "react";
import { UserContext } from '../../context/user/useUser'
import { processRoutes } from '../../utils/navigation/processRoute';

let navigation = []
const colorStyle = 'rgba(77, 96, 168, 1)'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  
  const user = useContext(UserContext);
  
  navigation = processRoutes(user.permissions)

  return (
    <Disclosure as="nav" style={{ backgroundColor: colorStyle }}>
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-12">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Buscador */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start invisible">
                <div className="relative ml-16 text-gray-600 lg:block hidden">
                  <input
                    className="border-2 border-gray-300 rounded bg-white h-9 pl-2 pr-40 text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Buscar"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 mt-3 mr-2"
                    style={{ top: '-1px' }}
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Seccion Derecha */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Icono Campana */}
                <button
                  type="button"
                  className="p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <ProfileDropdown />
              </div>
            </div>
          </div>

          <Disclosure.Panel>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="button"
                  className={classNames(
                    item.current
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
