import {
  StreamerbotClient,
  StreamerbotClientOptions,
  StreamerbotInfo,
  WebSocketStatus,
} from '@streamerbot/client'
import { useEffect, useRef, useState, useCallback } from 'react'

export type UseStreamerbotOptions = Partial<StreamerbotClientOptions>

export type UseStreamerbotReturn = {
  data: unknown
  status: WebSocketStatus
  error?: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  client?: StreamerbotClient
}

export function useStreamerbot(
  options: UseStreamerbotOptions
): UseStreamerbotReturn {
  const [data, setData] = useState<unknown>()
  const [status, setStatus] = useState<WebSocketStatus>('CLOSED')
  const [error, setError] = useState<string>()
  const clientRef = useRef<StreamerbotClient>(undefined)
  const optionsRef = useRef(options)

  const onConnect = useCallback((data: StreamerbotInfo) => {
    setStatus('OPEN')
    setError(undefined)
    optionsRef.current.onConnect?.(data)
  }, [])

  const onDisconnect = useCallback(() => {
    setStatus('CLOSED')
    optionsRef.current.onDisconnect?.()
  }, [])

  const onError = useCallback((err: Error) => {
    setError(err?.message ?? 'Unknown Error')
    setStatus('CLOSED')
    optionsRef.current.onError?.(err)
  }, [])

  const onData = useCallback((payload: unknown) => {
    setData(payload)
    optionsRef.current.onData?.(payload)
  }, [])

  const disconnect = useCallback(async () => {
    if (!clientRef.current) return

    try {
      clientRef.current.disconnect()
    } catch (e) {
      console.error(e)
    }

    setStatus('CLOSED')
  }, [])

  const initClient = useCallback(
    async (immediate: boolean = false) => {
      if (clientRef.current) {
        await disconnect()
        clientRef.current = undefined
      }

      if (immediate) setStatus('CONNECTING')

      const client = new StreamerbotClient({
        ...optionsRef.current,
        scheme: optionsRef.current.scheme || 'ws',
        host: optionsRef.current.host || '127.0.0.1',
        port: optionsRef.current.port || 8080,
        endpoint: optionsRef.current.endpoint || '/',
        immediate,
        onConnect,
        onDisconnect,
        onError,
        onData,
      })

      clientRef.current = client
    },
    [onConnect, onDisconnect, onError, onData, disconnect]
  )

  const connect = useCallback(async () => {
    if (!clientRef.current) {
      await initClient(true)
    }

    await clientRef.current?.connect()
  }, [initClient])

  useEffect(() => {
    initClient(!!optionsRef.current?.immediate)

    return () => {
      disconnect()
    }
  })

  return {
    data,
    status,
    error,
    connect,
    disconnect,
    client: clientRef.current,
  }
}
