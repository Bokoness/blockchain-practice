# Blockchain Practice

This workspace contains a small example with two crates:

- `listener_lib` – a library that connects to an Ethereum WebSocket RPC
  endpoint and emits full blocks as they arrive.
- `block_printer` – a binary using the library to print each new block to
  stdout.

The binary connects to a public WebSocket endpoint provided by Alchemy. Each
new block (including all transactions) is printed in pretty debug format.

Run it with:

```bash
cargo run -p block_printer
```
