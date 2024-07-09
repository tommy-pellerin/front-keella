import { Link } from "react-router-dom";
import SignOut from "../auth/sign-out";
import { useEffect, useState } from 'react';
import { getData } from '../../services/data-fetch';

//Atoms
import { useAtom } from "jotai";
import { userAtom } from '../../store/user'

//Styles
import logoKeella from '../../assets/images/logo_keella.png';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'



export default function Navbar() {
  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState(null);

  let navigation = [
    { name: '🔍 Trouver une séance', href: '/workouts', current: false },
  ]
  // navbar available only if is admin
  if (profile && profile.isAdmin) {
    navigation = [
      ...navigation,
      { name: 'Kit UI', href: '/kit-ui', current: false },
      { name: 'Gérer les catégories', href: '/categories', current: false },
    ];
  }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  useEffect(() => {
    if (!user.isLogged) {
      setProfile(null); // Reset profile state when user logs out
    } else if (user.isLogged) {
      // Fetch and set profile data if user is logged in
      const fetchProfileData = async () => {
        try {
          const data = await getData(`/users/${user.id}`);
          setProfile(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfileData();
    }
  }, [user]);

  return (
    <Disclosure as="nav" className="shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-blue-400 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src={logoKeella}
                    alt="keella"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-blue-900 text-blue-500' : 'text-blue-500 text-xl hover:bg-blue-700 hover:text-white',
                          'rounded-md px-3 py-2 font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link to="/help"
                  type="button"
                  className="relative p-1 text-blue-500  hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Aide
                  
                </Link>
                    

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {profile ?
                        (profile && 
                          <div className="h-8 w-8 border rounded-full flex justify-center items-center overflow-hidden">
                            {profile.avatar ? <img src={profile.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User avatar"/>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            }
                          </div>
                        )
                        :
                        <div className="h-8 w-8 border rounded-full flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </svg>
                        </div>
                      }
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!user.isLogged ?
                    <>
                      <MenuItem>
                        {({ focus }) => (
                          <Link to="/sign-in" className={classNames(focus ? 'bg-blue-100' : '', 'block text-center px-4 py-2 text-sm text-blue-700')}>Se connecter</Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link to="/sign-up" className={classNames(focus ? 'bg-blue-100' : '', 'block text-center px-4 py-2 text-sm text-blue-700')}>S&apos;inscrire</Link>
                        )}
                      </MenuItem>
                    </> 
                    : 
                    <>
                      <MenuItem>
                        {({ focus }) => (
                          <Link to="/my-account" className={classNames(focus ? 'bg-blue-100' : '', 'block text-center px-4 py-2 text-sm text-blue-700')}>Mon compte</Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link to={`/profile/${user.id}`} className={classNames(focus ? 'bg-blue-100' : '', 'block text-center px-4 py-2 text-sm text-blue-700')}>Mon profil</Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <div className={classNames(focus ? 'bg-blue-100' : '', 'block text-center px-4 py-2 text-sm text-blue-700')}>
                            <SignOut />
                          </div>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link to="/workouts/create" className={classNames(focus ? 'bg-blue-100' : '', 'block text-center px-4 py-2 text-sm text-blue-700')}>Créer une annonce</Link>
                        )}
                      </MenuItem>
                      
                    </>
                    }
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-blue-900 text-white' : 'text-blue-500 text-xl hover:bg-blue-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
