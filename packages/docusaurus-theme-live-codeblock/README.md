# Ianaio Live Codeblock

You can create live code editors with a code block `live` meta string.

Install

```bash
npm i @ianaio/theme-live-codeblock # or yarn add @ianaio/theme-live-codeblock
```

Modify your `ianaio.config.js`

```diff
module.exports = {
  ...
+ themes: ['@ianaio/theme-live-codeblock'],
  presets: ['@ianaio/preset-classic']
  ...
}
```

Example:

    ```jsx live
    function Clock(props) {
      const [date, setDate] = useState(new Date());
      useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
          clearInterval(timerID);
        };
      });

      function tick() {
        setDate(new Date());
      }

      return (
        <div>
          <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
    ```
