#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

// Candid generator for exporting the Candid interface
ic_cdk::export_candid!();
