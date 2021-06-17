use {
    bpf_program_template::process_instruction,
    assert_matches::assert_matches,
    solana_program::{
        instruction::{AccountMeta, Instruction},
        pubkey::Pubkey,
    },
    solana_sdk::{signature::Signer, transaction::Transaction},
    solana_program_test::{processor, tokio, ProgramTest}
};

#[tokio::test]
async fn test_transaction() {
    let program_id = Pubkey::new_unique();
    let pt = ProgramTest::new(
        "bpf_program_template",
        program_id,
        processor!(process_instruction),
    );

    let (mut banks_client, payer, recent_blockhash) = pt.start().await;

    let mut transaction = Transaction::new_with_payer(
        &[Instruction {
            program_id,
            accounts: vec![AccountMeta::new(payer.pubkey(), false)],
            data: vec![1, 2, 3],
        }],
        Some(&payer.pubkey()),
    );
    transaction.sign(&[&payer], recent_blockhash);

    assert_matches!(banks_client.process_transaction(transaction).await, Ok(()));
}
