{
    description = "A simple development environment for Node.js + Moleculer";
    inputs = {
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    };
    outputs = { self, nixpkgs }:
    let
        system = "aarch64-darwin"; # Adjust to "x86_64-linux" or "aarch64-linux" as needed
        pkgs = import nixpkgs { inherit system; config.allowUnfree = true; };
    in {
        devShells.${system}.default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_25
              pkgs.nats-server
              pkgs.postgresql
              pkgs.awscli2
              pkgs.terraform
              pkgs.process-compose
              pkgs.httpie
            ];

            shellHook = ''
                export PGHOST=$PWD/data/postgres/locks
            '';
        };
    };
}