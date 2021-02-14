import React from 'react'
import { IconGithub } from '../IconGithub'
import { IconTelegram } from '../IconTelegram'
import { IconTwitter } from '../IconTwitter'

const getIconBackgroundColor = networkBranch => {
  return (
    {
      dai: '#e3e7e9',
      poa: '#fff',
      sokol: '#fff',
      kovan: '#fff'
    }[networkBranch] || '#fff'
  )
}

const getIconColor = networkBranch => {
  return (
    {
      dai: '#333',
      poa: '#5c34a2',
      sokol: '#6ac9b9',
      kovan: '#6ac9b9'
    }[networkBranch] || '#5c34a2'
  )
}

export const SocialIcons = ({ extraClass = '', networkBranch = '' }) => {
  const backgroundColor = getIconBackgroundColor(networkBranch)
  const iconColor = getIconColor(networkBranch)

  return (
    <div className={`ft-SocialIcons ${extraClass}`}>
      <IconTwitter
        backgroundColor={backgroundColor}
        color={iconColor}
        text="Fuse Twitter"
        url="https://twitter.com/fuse_network?lang=en"
      />
      <IconTelegram
        backgroundColor={backgroundColor}
        color={iconColor}
        text="Fuse Telegram"
        url="https://t.me/fuseio"
      />
      <IconGithub
        backgroundColor={backgroundColor}
        color={iconColor}
        text="Fuse Github"
        url="https://github.com/fuseio"
      />
    </div>
  )
}
