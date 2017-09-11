#!/usr/bin/env bash

# -----------------------------------------------------------------------------
# Safety settings (see https://gist.github.com/ilg-ul/383869cbb01f61a51c4d).

if [[ ! -z ${DEBUG} ]]
then
  set -x # Activate the expand mode if DEBUG is anything but empty.
fi

set -o errexit # Exit if command failed.
set -o pipefail # Exit if pipe failed.
set -o nounset # Exit if variable not set.

# Remove the initial space and instead use '\n'.
IFS=$'\n\t'

# -----------------------------------------------------------------------------

script_path="$0"
if [[ "${script_path}" != /* ]]
then
  # Make relative path absolute.
  script_path="$(pwd)/$0"
fi

script_folder="$(dirname ${script_path})"
# echo $script_folder

cd "$(dirname "${script_folder}")"

# -----------------------------------------------------------------------------

npm link @micro-os-plus/c-libs
npm link @micro-os-plus/cpp-libs
npm link @micro-os-plus/diag-trace
npm link @micro-os-plus/riscv-arch
npm link @micro-os-plus/startup
npm link @sifive/coreplex-arty-boards
npm link @sifive/coreplex-devices

npm link @ilg/cli-start-options
npm link @ilg/es6-promisifier
