use env_logger::{Builder, Env};
use tiny_file_server::FileServer;

fn main() {
    Builder::from_env(Env::default().default_filter_or("debug")).init();

    FileServer::http("127.0.0.1:80")
        .expect("Couldn't create the server socket on port 9080")
        .run("./")
        .expect("Couldn't start the server");
}