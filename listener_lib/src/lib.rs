pub mod eth_listener {
    use ethers::prelude::*;
    use tokio_stream::StreamExt;
    use std::error::Error;

    /// Connects to the given WebSocket RPC endpoint and continuously prints
    /// full blocks (including transactions) as they are produced.
    pub async fn print_new_blocks(ws_url: &str) -> Result<(), Box<dyn Error>> {
        let ws = Ws::connect(ws_url).await?;
        let provider = Provider::new(ws);

        let mut stream = provider.subscribe_blocks().await?;
        while let Some(header) = stream.next().await {
            if let Some(hash) = header.hash {
                if let Some(block) = provider.get_block_with_txs(hash).await? {
                    println!("{:#?}", block);
                }
            }
        }
        Ok(())
    }
}
