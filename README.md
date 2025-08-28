# Streamer.bot React

[Full Documentation](https://streamerbot.github.io/client/)

## 🌈 Demo

No demo yet, but all functionality on [Streamer.bot Toolkit](https://toolkit.streamer.bot) is utilizing the vue client library, so you could check that and transform accordingly.

## 📦 Installation

Package Manager

```bash
yarn add @streamerbot/client streamerbot-react

npm install @streamerbot/client streamerbot-react

pnpm install @streamerbot/client streamerbot-react
```

## 🦄 Basic Usage

```ts
import { useStreamerbot } from 'streamerbot/react';

// Inside a React Component
export default function MyComponent() {
  const { client, data } = useStreamerbot();

  useEffect(() => {
    console.log('Data received from Streamer.bot Client!', data);
  }, [data]);

  return <div><h1>My Component</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>;
}
```

Check out the [docs](https://streamerbot.github.io/client/) for more usage examples.

## 🌸 Thanks

- [nate1280](https://github.com/nate1280) for creating Streamer.bot
- [whipstickgostop](https://github.com/whipstickgostop) for creating the vue client library which this is heavily based on

## 👨‍🚀 Contributors

[bsides](https://github.com/bsides)

## 📄 License

MIT License © 2025-Present [bsides](https://github.com/bsides)
