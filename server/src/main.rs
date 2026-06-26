use axum::{Json, Router, routing::get};
use serde::Serialize;
use sysinfo::{Components, System};

#[derive(Serialize)]
struct Metrics {
    cpu: f32,
    system_name: String,
    host_name: String,
    total_ram: u64,
    used_ram: u64,
    num_cpu: usize,
    cpu_temp: f32,
}
async fn get_metrics() -> Json<Metrics> {
    let mut sys = System::new_all();
    sys.refresh_all();
    std::thread::sleep(std::time::Duration::from_millis(100));
    sys.refresh_all();
    let components = Components::new_with_refreshed_list();
    let cpu_temp = components
        .iter()
        .find(|c| c.label().contains("Package id 0"))
        .and_then(|c| c.temperature())
        .unwrap_or(0.0);

    Json(Metrics {
        cpu: sys.global_cpu_usage() / 100.0,
        system_name: System::name().unwrap(),
        host_name: System::host_name().unwrap(),
        total_ram: sys.total_memory(),
        used_ram: sys.used_memory(),
        num_cpu: sys.cpus().len(),
        cpu_temp: cpu_temp,
    })
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/metrics", get(get_metrics));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
