#!/bin/bash

# Git commit script for updating repository
# Usage: ./commit.sh "your commit message"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if commit message is provided
if [ -z "$1" ]; then
    print_error "Commit message is required!"
    echo "Usage: ./commit.sh \"your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not a git repository!"
    exit 1
fi

echo "=================================="
echo "  Git Commit & Push Script"
echo "=================================="
echo ""

# Show current branch
CURRENT_BRANCH=$(git branch --show-current)
print_warning "Current branch: $CURRENT_BRANCH"
echo ""

# Show git status
echo "Files to be committed:"
echo "=================================="
git status --short
echo "=================================="
echo ""

# Ask for confirmation
read -p "Do you want to proceed with commit and push? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Commit cancelled."
    exit 0
fi

# Stage all changes
echo ""
print_warning "Staging all changes..."
git add .
if [ $? -eq 0 ]; then
    print_success "Files staged successfully"
else
    print_error "Failed to stage files"
    exit 1
fi

# Create commit with the provided message
echo ""
print_warning "Creating commit..."
git commit -m "$(cat <<EOF
$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"

if [ $? -eq 0 ]; then
    print_success "Commit created successfully"
else
    print_error "Failed to create commit"
    exit 1
fi

# Push to remote
echo ""
print_warning "Pushing to remote repository..."
git push

if [ $? -eq 0 ]; then
    print_success "Successfully pushed to remote repository!"
    echo ""
    git log -1 --oneline
else
    print_error "Failed to push to remote"
    echo ""
    print_warning "You may need to pull changes first or check your remote settings"
    exit 1
fi

echo ""
print_success "All done!"
