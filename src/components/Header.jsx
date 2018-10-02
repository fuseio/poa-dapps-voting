import React from 'react'
import logoBase from '../assets/images/logos/logo-poa.svg'
import logoSokol from '../assets/images/logos/logo-sokol.svg'
import menuIconBase from '../assets/images/icons/icon-menu.svg'
import menuIconSokol from '../assets/images/icons/icon-menu-sokol.svg'
import menuOpenIconBase from '../assets/images/icons/icon-close.svg'
import menuOpenIconSokol from '../assets/images/icons/icon-close-sokol.svg'
import NavigationLinks from './NavigationLinks.jsx'
import MobileMenuLinks from './MobileMenuLinks.jsx'

export const Header = ({ netId, baseRootPath, navigationData, showMobileMenu, onMenuToggle }) => {
  const isTestnet = netId === '77' || netId === '79'
  const headerClassName = isTestnet ? 'sokol' : ''
  const logoImageName = isTestnet ? logoSokol : logoBase
  const menuIcon = isTestnet ? menuIconSokol : menuIconBase
  const menuOpenIcon = isTestnet ? menuOpenIconSokol : menuOpenIconBase

  return (
    <header className={`header ${headerClassName}`}>
      {showMobileMenu && (
        <div className="header-mobile-menu-container">
          {<MobileMenuLinks onMenuToggle={onMenuToggle} navigationData={navigationData} />}
        </div>
      )}
      <div className="container">
        <a className="header-logo-a" href={baseRootPath}>
          <img className="header-logo" src={logoImageName} alt="" />
        </a>
        <div className="links-container">
          <NavigationLinks navigationData={navigationData} />
        </div>
        <div className="mobile-menu">
          <img
            alt=""
            className={showMobileMenu ? 'mobile-menu-open-icon' : 'mobile-menu-icon'}
            onClick={onMenuToggle}
            src={showMobileMenu ? menuOpenIcon : menuIcon}
          />
        </div>
      </div>
    </header>
  )
}
