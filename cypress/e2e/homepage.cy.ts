describe('HomePage', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should render the main components', () => {
    // Check that the main title is present
    cy.contains('NASA Data Explorer').should('be.visible');

    // Check that the subtitle is present
    cy.contains('Real-time space data and mission analytics').should(
      'be.visible'
    );

    // Check that the system status is shown
    cy.contains('🚀 System Status: Online').should('be.visible');

    // Check that the initializing message is present (it animates)
    cy.get('body').should(($body) => {
      const text = $body.text();
      expect(text).to.include('Dashboard initializing');
    });

    // Check that the main action buttons are present
    cy.contains('button', 'Start Exploring').should('be.visible');
    cy.contains('button', 'Plan Mission').should('be.visible');
  });

  it('should show falling stars animation', () => {
    // Check that the falling stars container exists
    cy.get('.lines').should('exist');

    // Check that individual star lines exist
    cy.get('.line').should('have.length.at.least', 5);
  });

  it('should have proper accessibility attributes', () => {
    // Check that buttons exist and have proper attributes
    cy.get('button').should('have.length.at.least', 2);

    // Check that the main heading exists (important for screen readers)
    cy.get('h3').contains('NASA Data Explorer').should('exist');
  });

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport(375, 667); // iPhone SE size
    cy.contains('NASA Data Explorer').should('be.visible');
    cy.contains('button', 'Start Exploring').should('be.visible');

    // Test tablet viewport
    cy.viewport(768, 1024); // iPad size
    cy.contains('NASA Data Explorer').should('be.visible');
    cy.contains('button', 'Plan Mission').should('be.visible');

    // Test desktop viewport
    cy.viewport(1280, 720);
    cy.contains('NASA Data Explorer').should('be.visible');
  });

  it('should interact with mission planning modal', () => {
    // Click on Plan Mission button
    cy.contains('button', 'Plan Mission').click();

    // Check that the modal opens
    cy.contains('🛰️ Mission Planning').should('be.visible');

    // Check that form fields are present
    cy.contains('Plan Your Mars Mission').should('be.visible');

    // Close the modal by clicking the X button
    cy.get('[data-testid="CloseIcon"]').click();

    // Verify modal is closed (mission planning text should not be visible)
    cy.contains('🛰️ Mission Planning').should('not.exist');
  });

  it('should handle Start Exploring interaction', () => {
    // Initially, the button should say "Start Exploring"
    cy.contains('button', 'Start Exploring')
      .should('be.visible')
      .and('not.be.disabled');

    // Click the Start Exploring button
    cy.contains('button', 'Start Exploring').click();

    // After clicking, button text should change and become disabled
    cy.contains('button', 'Exploring...')
      .should('be.visible')
      .and('be.disabled');

    // The table should appear (we'll check for the table title)
    cy.contains('🛰️ Mars Rover Photo Explorer', { timeout: 10000 }).should(
      'be.visible'
    );

    // Status text should change to "Mars rover data loaded!"
    cy.contains('Mars rover data loaded!').should('be.visible');
  });
});
