import { API_BASE_URL } from './config'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Request to ${path} failed (${response.status}): ${body}`)
  }

  const contentType = response.headers.get('content-type') || ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

export function getMe() {
  return request('/api/me')
}

export function startAnonymousSession() {
  return request('/auth/session', { method: 'POST' })
}

export function uploadResume(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request('/api/cv/upload', {
    method: 'POST',
    body: formData,
  })
}